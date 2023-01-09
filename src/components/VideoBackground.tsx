import { NextPage } from "next"

const VideoBackground: NextPage = () => {

    return(
        <video className=" fixed -z-50 min-w-full min-h-full"
          autoPlay muted loop id="myVideo">
          <source src="/wallpers/tree02.mov" />
        </video>
    )
}

export default VideoBackground