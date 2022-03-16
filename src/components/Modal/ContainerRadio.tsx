interface ContainerRadios {
  labelTitle: string;
}

const ContainerRadios: React.FC<ContainerRadios> = ({
  labelTitle,
  children,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-bold">{labelTitle}</p>

      <div className="flex flex-col flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default ContainerRadios;
