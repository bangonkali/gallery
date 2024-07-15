import styles from "./gallery.module.css";
import { useStore } from "@tanstack/react-store";
import { GalleryMasonryView } from "./gallery-masonry-view";
import { GalleryDock } from "./gallery-dock";
import { GalleryEditView } from "./gallery-edit-view";
import { GalleryFooter } from "./gallery-footer";
import { GalleryHeader } from "./gallery-header";
import { focusedImageStore } from "../../data/store/gallery-items-store";
import { galleryStoreLayout } from "../../data/store/gallery-store";
import { onSplitterEnd } from "../../data/store/mutations/splitter/on-splitter-end";
import { onSplitterMouseMoveAll } from "../../data/store/mutations/splitter/on-splitter-mouse-move-all";
import { computeGalleryLayout } from "../../data/store/selectors/compute-gallery-layout";

type GalleryProps = {
  height: number;
  width: number;
};

export const Gallery: React.FC<GalleryProps> = (props) => {
  const focusedImageId = useStore(focusedImageStore);
  const layout = useStore(galleryStoreLayout, (state) => {
    return computeGalleryLayout({ ...props, state, focusedImageId });
  });

  return (
    <div
      className={styles.gallery}
      style={{
        overflow: "hidden",
        height: `${props.height}px`,
        width: `${props.width}px`,
      }}
    >
      <GalleryHeader
        width={layout.header.width}
        height={layout.header.height}
      />
      <div
        className={styles.content}
        style={{
          cursor: layout.docks.workspace.resizing ? "col-resize" : "default",
        }}
        onMouseLeave={() => onSplitterEnd(galleryStoreLayout)}
        onMouseUp={() => onSplitterEnd(galleryStoreLayout)}
        onMouseMove={(e) => {
          onSplitterMouseMoveAll(
            { width: props.width, height: props.height },
            layout,
            galleryStoreLayout,
            e
          );
        }}
      >
        {/* {layout.docks.left.visible ? (
          <GalleryDock layout={layout} side="left" />
        ) : null} */}
        <div
          className={styles.workspace}
          style={{
            width: `${layout.docks.workspace.width}px`,
            height: `${layout.docks.workspace.height}px`,
          }}
        >
          {/* {layout.docks.workspace.view === "masonry" ? ( */}
          <GalleryMasonryView
            view={layout.docks.workspace.view}
            width={layout.docks.workspace.width}
            height={layout.docks.workspace.height}
          />
          {/* ) : (
            <GalleryEditView layout={layout} />
          )} */}
        </div>
        {/* {layout.docks.right.visible ? (
          <GalleryDock layout={layout} side="right" />
        ) : null} */}
      </div>
      <GalleryFooter
        height={layout.footer.height}
        width={layout.footer.width}
      />
    </div>
  );
};
