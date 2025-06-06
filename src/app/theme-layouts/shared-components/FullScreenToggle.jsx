import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Maximize } from "lucide-react";
import { Minimize } from "lucide-react";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The header full screen toggle.
 */
function HeaderFullScreenToggle(props) {
  const { className = "" } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEnhancedEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullScreen(document[getBrowserFullscreenElementProp()] != null);
    return () => {
      document.onfullscreenchange = null;
    };
  });

  function getBrowserFullscreenElementProp() {
    const doc = document;

    if (typeof doc.fullscreenElement !== "undefined") {
      return "fullscreenElement";
    }

    if (typeof doc.mozFullScreenElement !== "undefined") {
      return "mozFullScreenElement";
    }

    if (typeof doc.msFullscreenElement !== "undefined") {
      return "msFullscreenElement";
    }

    if (typeof doc.webkitFullscreenElement !== "undefined") {
      return "webkitFullscreenElement";
    }

    throw new Error("fullscreenElement is not supported by this browser");
  }

  /* View in fullscreen */
  function openFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  function closeFullscreen() {
    const doc = document;

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      /* Firefox */
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      /* IE/Edge */
      doc.msExitFullscreen();
    }
  }

  function toggleFullScreen() {
    const doc = document;

    if (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement
    ) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  }

  return (
    <Tooltip
      title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      placement="bottom"
    >
      <IconButton
        onClick={toggleFullScreen}
        className={clsx("h-40 w-40", className)}
        size="large"
      >
        {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </IconButton>
    </Tooltip>
  );
}

export default HeaderFullScreenToggle;
