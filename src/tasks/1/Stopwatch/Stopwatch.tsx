import React, {FC, useState, useRef} from "react";
import './stopwatch.css'

interface IStopwatchProps {}

type IStopwatchState = {
    status: boolean;
    runningTime: number;
}


  const Stopwatch: FC<IStopwatchState> = () => {

    const [runningTime, setRunningTime] = useState(0)
    const [status, setStatus] = useState(false)
    const timerRef = useRef(0)

    const handleStart = () => {

      if(status) {
        clearInterval(timerRef.current)
        setStatus(false)

      } else {
        setStatus(true)

        const startTime = Date.now() - runningTime;
        timerRef.current = setInterval(() => {
          setRunningTime(Date.now() - startTime)
        })
      }
    }

    const handleReset = () => {
        clearInterval(timerRef.current)
        setStatus(false)
        setRunningTime(0)
    }


    const handleLap = () => {
        console.log(getUnits(runningTime));
    };

    const getUnits = (runningTime: number) => {
        const seconds = runningTime / 1000;

        const min = Math.floor(seconds / 60).toString();
        const sec = Math.floor(seconds % 60).toString();
        const msec = (seconds % 1).toFixed(3).substring(2);

        return `${min}:${sec}:${msec}`;
    }


    return (
      <div className="stopwatch">
        <div className='stopwatch-card'>
          <p>{getUnits(runningTime)}</p>
          <div className='buttons'>
            {
              !status ?
                <button onClick={handleStart}>Start</button>
                : (
                  status ? <button onClick={handleStart}>Pause</button> :
                  <button onClick={handleStart}>Start</button>
                )
            }

            <button onClick={handleReset}>Reset</button>
            <button onClick={handleLap}>Lap</button>
          </div>
        </div>
      </div>
    );
}

export default Stopwatch;
