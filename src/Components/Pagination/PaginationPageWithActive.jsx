import cn from "classnames/bind";
import PaginationPage from "./PaginationPage";

const PaginationPageWithActive = ({
  isDarkTheme,
  isActive,
  className,
  ...other
}) => {
  return (
    <PaginationPage
      isDarkTheme={isDarkTheme}
      className={cn(className, {
        PaginationPageWithActive: isActive && !isDarkTheme,
        "PaginationPageWithActive--dark": isDarkTheme && isActive,
      })}
      {...other}
    />
  );
};

export default PaginationPageWithActive;
