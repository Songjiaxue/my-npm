export interface IconBaseProps {
  style: React.CSSProperties;
  type: string;
  // content: string | React.ReactSVGElement;
  content: any;
  className: string;
  changeColors: string[];
  prefixCls: string; // 样式名前缀
  onClick: React.MouseEventHandler<SVGSVGElement>;
  onMouseDown: React.MouseEventHandler<SVGSVGElement>;
}
