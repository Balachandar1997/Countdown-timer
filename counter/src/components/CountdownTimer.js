import { useEffect, useState ,useRef} from "react"
import "./CountdownTimer.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
function CountdownTimer(){
   const [expiryTime, setExpiryTime] = useState(localStorage.getItem("expiryTime") ||"5 may 2023 15:30:25");
   const [countdownTime, setCountdownTime]= useState(
       {
           countdownDays:'',    
           countdownHours:'',
           countdownMinutes:'',
           countdownSeconds:''
       }
   );

   const intervalRef=useRef(null)
    const countdownTimer=()=>{
      //start the countdown
    
        intervalRef.current= setInterval(() => {
          const countdownDateTime = new Date(expiryTime).getTime(); 
          console.log("countdownDatetime",countdownDateTime)
          const currentTime = new Date().getTime();
          console.log("current time",currentTime)
          const remainingDayTime = countdownDateTime - currentTime;
          const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
          const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
          const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);
     
          const runningCountdownTime={
             countdownDays: totalDays,
             countdownHours: totalHours,
             countdownMinutes: totalMinutes,
             countdownSeconds: totalSeconds
          }
       
          setCountdownTime(runningCountdownTime);
     
          if (remainingDayTime < 0) {
             clearInterval(intervalRef.current);
             setExpiryTime(null);
            }
     
         }, 1000);
    }
    const pauseCountdown = () => {
        // Pause the countdown
        clearInterval(intervalRef.current);
      };
    
      const resumeCountdown = () => {
        // Resume the countdown
        countdownTimer();
      };
    
      const stopCountdown = () => {
        // Stop the countdown
        clearInterval(intervalRef.current);
        setCountdownTime({
          countdownDays: "",
          countdownHours: "",
          countdownMinutes: "",
          countdownSeconds: "",
        });
        setExpiryTime(null);
        localStorage.removeItem("expiryTime");
      };
     
    useEffect(() => {

      const storedExpiryTime = localStorage.getItem("expiryTime");

          if (storedExpiryTime) {
            setExpiryTime(storedExpiryTime);
          } else {
            localStorage.setItem("expiryTime", expiryTime);
          }
        countdownTimer();
        return ()=>{
          clearInterval(intervalRef.current)
          localStorage.setItem("expiryTime", expiryTime);
        }
    },[]);
   
    return(
        <div className="parent">
            <div className="child">
            <div className=" top_heading">
                <div className="count_heading">
                <h4>Countdown Timer</h4>
                </div>
                <div className="stage">
                <button>STAGE 1</button>    
                </div>
            </div>
           
            <div className="show_timer">
            {expiryTime!==null?
                <>
                <div>
                <h1>{countdownTime.countdownDays} : </h1>
                <h2>D</h2>
                </div>
                <div>
                <h1>{countdownTime.countdownHours} : </h1>
                <h2>H</h2>
                </div>
                <div>
                <h1>{countdownTime.countdownMinutes} : </h1>
                <h2>M</h2>
                </div>
                <div>
                <h1>{countdownTime.countdownSeconds}</h1>
                <h2>S</h2>
                </div>
                </>
                :<p>Deal has been Expired</p>}
         </div>
         <div className="controls">
          {expiryTime !== null && (
            <>
            <div class="dropdown">
            <i className="fas fa-cog fa-2x"></i>
               <div class="dropdown-content">
                  <button onClick={countdownTimer}>Start</button>
                  <button onClick={pauseCountdown}>Pause</button>
                  <button onClick={resumeCountdown}>Resume</button>
                  <button onClick={stopCountdown}>Stop</button>
                </div>
            </div>
            
            </>
          )}
         </div>
         </div>
            </div>
        
    )
}
export default CountdownTimer;
