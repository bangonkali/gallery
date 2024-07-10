import { colors } from "../../consts/colors";

export type GalleryFooterProps = {
  height: number;
  width: number;
};

export const GalleryFooter: React.FC<GalleryFooterProps> = ({
  height,
  width,
}) => {
  const topBorder = 1;
  return (
    <div
      style={{
        height: `${height - topBorder}px`,
        width: `${width}px`,
        borderTop: `${topBorder}px solid ${colors.borders}`,
        backgroundColor: colors.headerBackground,
        color: colors.headerForeground,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Footer
    </div>
  );
};
