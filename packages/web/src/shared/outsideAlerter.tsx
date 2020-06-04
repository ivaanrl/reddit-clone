import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideAlerter = (
  ref: { current: HTMLElement } | React.MutableRefObject<null>,
  notCloseClass: string,
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      //if (typeof ref.current === "string") {

      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (!(event.target as HTMLElement).classList.contains(notCloseClass)) {
          setPopoverOpen(false);
        }
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setPopoverOpen, notCloseClass]);
};

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props: {
  children: any;
  notCloseClass: string;
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { children, setPopoverOpen, notCloseClass } = props;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, notCloseClass, setPopoverOpen);

  return <div ref={wrapperRef}>{children}</div>;
}
