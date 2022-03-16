function withoutParentsActionPropagation(
  e: React.MouseEvent<HTMLElement, MouseEvent>,
  onClick?: (...rest: any) => void
) {
  e.stopPropagation();

  if (!onClick) return;
  onClick(e);
}

export default withoutParentsActionPropagation;
