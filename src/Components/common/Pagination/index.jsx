import cn from "classnames/bind";
import PaginationPageWithActive from "./PaginationPageWithActive";
import PaginationPage from "./PaginationPage";
import { ReactComponent as DoubleArrowL } from "../../../images/doubleArrowL.svg";
import { ReactComponent as ArrowR } from "../../../images/arrowR.svg";
import { ReactComponent as DoubleArrowR } from "../../../images/doubleArrowR.svg";
import { ReactComponent as ArrowL } from "../../../images/arrowL.svg";
import usePaginationSlice from "../../../hooks/usePaginationSlice";
import styles from "./Pagination.module.scss";

const cx = cn.bind(styles);

const Pagination = ({
  currentPage,
  isDarkTheme = false,
  pagesAmount,
  className,
  onChange,
}) => {
  const slicedPagesArray = usePaginationSlice({
    current: currentPage,
    amount: pagesAmount,
  });

  const leftArrowProps = {
    isDarkTheme,
    disabled: currentPage < 2,
  };

  const rightArrowProps = {
    isDarkTheme,
    disabled: currentPage >= pagesAmount,
  };

  return (
    <div className={cx(className, "Pagination")}>
      <PaginationPage {...leftArrowProps} onClick={() => onChange(1)}>
        <DoubleArrowL />
      </PaginationPage>
      <PaginationPage
        {...leftArrowProps}
        onClick={() => onChange(currentPage - 1)}
      >
        <ArrowL />
      </PaginationPage>

      {slicedPagesArray.map((el) => (
        <PaginationPageWithActive
          isDarkTheme={isDarkTheme}
          onClick={() => onChange(el)}
          isActive={currentPage === el}
          key={el}
        >
          {el}
        </PaginationPageWithActive>
      ))}
      <PaginationPage
        {...rightArrowProps}
        onClick={() => onChange(currentPage + 1)}
      >
        <ArrowR />
      </PaginationPage>
      <PaginationPage
        {...rightArrowProps}
        onClick={() => onChange(pagesAmount)}
      >
        <DoubleArrowR />
      </PaginationPage>
    </div>
  );
};

export default Pagination;
