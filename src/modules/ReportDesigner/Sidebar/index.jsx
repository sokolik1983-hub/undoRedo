import DragNDropProvider from "../../QueryPanel/context/DragNDropContext";
import ObjectsPanel from "../../QueryPanel/ObjectsPanel";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <DragNDropProvider>
        <ObjectsPanel
          symanticLayer={semanticLayer}
          onToggleClick={handleShowSelector}
          showHeader={false}
        />
      </DragNDropProvider>
    </div>
  );
};

export default Sidebar;
