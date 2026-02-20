import {useState, useEffect} from 'react';

const Timer = ({isTimerRunning}) => {
    const [time, setTime] = useState(50);

    useEffect(()=> {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(()=> {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        }

    }, [isTimerRunning]);

    return (
        <>
            {time}
        </>
    )
};

export {Timer};