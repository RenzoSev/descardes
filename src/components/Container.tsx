interface MainContainerProps {
  containerClassName?: string;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  containerClassName,
}) => {
  const SECTION_BASE_CLASS_NAME = 'flex h-full flex-col gap-8 px-4 py-8';
  const SECTION_CLASS_NAME = SECTION_BASE_CLASS_NAME + ' ' + containerClassName;

  return <section className={SECTION_CLASS_NAME}>{children}</section>;
};

export default MainContainer;
