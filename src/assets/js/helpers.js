export const scrollToPosition = (scrollValue, delay=900) => {
    setTimeout(() => {
        window.scrollTo({
          top: scrollValue,
          left: 0,
          behavior: "smooth",
        }); 
      }, delay);
}