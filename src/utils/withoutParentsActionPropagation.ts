function withoutParentsActionPropagation(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  onClick?: (...rest: any) => void
) {
  if (!onClick) return;
  e.stopPropagation();
  onClick(e);
}

export default withoutParentsActionPropagation;
