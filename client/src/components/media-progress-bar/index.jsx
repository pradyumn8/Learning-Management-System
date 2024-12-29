import {motion} from 'framer-motion'
import { useEffect } from 'react';

function MediaProgressbar({isMediaUploading, progress}){

    const [showProgress, setShowProgress] = useSatate(false);
    const [animateProgress, setAnimatedProgress] = useSatate(0)

    useEffect(()=>{
        if(isMediaUploading) {
            setShowProgress(true)
            setAnimatedProgress(progress)
        } else {
            const timer = setTimeout(()=>{
                setShowProgress(false)
            },1000)
            return () => clearTimeout(timer)
        }
    },[isMediaUploading, progress])

    if(!showProgress) return null

    return (
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 relative overflow-hidden">
            <motion.div className='bg-black h-3 rounded-full'
            initial={{width : 0}}
            animate={{
                width : `${animateProgress}%`,
                transition: {duration:0.5, ease : 'easeInOut'}
            }}
            >
                {
                    progress >= 100 && isMediaUploading &&
                    (
                        <motion.div
                        className='absolute top-0 left-0 right-0 bottom-0 bg-red-700 opacity-50'
                        animate={{
                            x: ['0%','100%','0%']
                        }}
                        transition={{
                            duration : 2,
                            repeat : Infinity,
                            ease : 'linear'
                        }}
                        />
                      
                    )
                }
            </motion.div>
        </div>
    );
}

export default MediaProgressbar;