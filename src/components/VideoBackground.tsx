import { NextPage } from "next"

const VideoBackground: NextPage = () => {
  const randomVideo: number = Math.floor(Math.random()*3)
  const videosSrc: string [] = ["/wallpers/tree02.mov", "/wallpers/forest02.mp4"]
    return(
        <video className=" fixed -z-50 min-w-full min-h-full"
          autoPlay muted loop id="myVideo">
          <source src={videosSrc[randomVideo]}/>
          <source src="/wallpers/forest02.mp4"/>
          <source src="/wallpers/tree02.mov" />
        </video>
    )
}

export default VideoBackground