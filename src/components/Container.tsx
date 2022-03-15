const MainContainer: React.FC = ({ children }) => {
  return (
    <section className="flex flex-col gap-8 px-4 py-8">{children}</section>
  );
};

export default MainContainer;
