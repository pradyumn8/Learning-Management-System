const Order = require('../../models/Order');
const StudentCourses = require('../../models/StudentCourses')
const Course = require('../../models/Course')
const razorpayInstance = require('../../helpers/razorpay');
const crypto = require('crypto');
require('dotenv').config();



const createOrder = async (req, res) => {
    const {
        coursePricing, 
        userId,
        userName,
        userEmail,
        courseId,
        instructorId,
        instructorName,
        courseImage,
        courseTitle,
    } = req.body;

    console.log("Request body:", req.body);

    try {
        // Validate required fields
        if (!coursePricing || !userId || !userName || !userEmail || !courseId) {
            console.error("Validation failed:", req.body);
            return res.status(400).json({ message: 'Missing required fields!' });
        }

        // Convert coursePricing to the smallest currency unit (e.g., paise for INR)
        const amountInSmallestUnit = Number(coursePricing) * 100;

        // Create Razorpay order options
        const options = {
            amount: amountInSmallestUnit,
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString('hex'),
        };

        // Create Razorpay order
        const order = await razorpayInstance.orders.create(options);
        if (!order) {
            console.error("Error creating Razorpay order");
            return res.status(500).json({ message: 'Error creating Razorpay order' });
        }

        // Save the newly created order in the database
        const newOrder = new Order({
            userId,
            userName,
            userEmail,
            orderStatus: 'pending',
            paymentMethod: 'razorpay',
            paymentStatus: 'pending',
            orderDate: new Date(),
            instructorId,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing, // Save the coursePricing field
            razorpayOrderId: order.id,
        });

        await newOrder.save();
        console.log("Order saved to the database:", newOrder);

        // Respond with the Razorpay order details
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error("Error in createOrder:", error);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
};


//try to implement redirect to payment return route
const capturePaymentAndFinalizeOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(sign.toString())
            .digest("hex");

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

            if (!order) {
                return res.status(404).json({ message: 'Order not found!' });
            }

            // Prepare the capture data to be sent to your backend service for payment finalization
            const captureData = {
                razorpay_order_id: razorpay_order_id,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature,
            };

            // Call the service to capture and finalize the payment (ensure this function is defined)
            // const verifyData = await captureAndFinalizePaymentService(captureData);
            const verifyData = await captureAndFinalizePaymentService(razorpay_order_id, razorpay_payment_id, razorpay_signature);

            // If payment is verified successfully, proceed with updating the order and related data
            if (verifyData.success) {
                // Update order status to "paid"
                order.paymentStatus = 'paid';
                order.orderStatus = 'confirmed';
                order.razorpayPaymentId = razorpay_payment_id;
                order.razorpaySignature = razorpay_signature;

                await order.save();

                // Update StudentCourses
                const studentCourses = await StudentCourses.findOne({ userId: order.userId });

                if (studentCourses) {
                    studentCourses.courses.push({
                        courseId: order.courseId,
                        title: order.courseTitle,
                        instructorId: order.instructorId,
                        instructorName: order.instructorName,
                        dateOfPurchase: order.orderDate,
                        courseImage: order.courseImage,
                    });
                    await studentCourses.save();
                } else {
                    const newStudentCourses = new StudentCourses({
                        userId: order.userId,
                        courses: [
                            {
                                courseId: order.courseId,
                                title: order.courseTitle,
                                instructorId: order.instructorId,
                                instructorName: order.instructorName,
                                dateOfPurchase: order.orderDate,
                                courseImage: order.courseImage,
                            },
                        ],
                    });
                    await newStudentCourses.save();
                }

                // Update Course schema with student details
                await Course.findByIdAndUpdate(order.courseId, {
                    $addToSet: {
                        students: {
                            studentId: order.userId,
                            studentName: order.userName,
                            studentEmail: order.userEmail,
                            paidAmount: order.coursePricing,
                        },
                    },
                });

                // Redirect to the payment return route
                res.redirect(`/payment-return?courseId=${order.courseId}`);
            } else {
                res.status(400).json({ message: "Payment verification failed: " + verifyData.error });
            }
        } else {
            res.status(400).json({ message: "Invalid signature!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
};

module.exports = { createOrder, capturePaymentAndFinalizeOrder };
