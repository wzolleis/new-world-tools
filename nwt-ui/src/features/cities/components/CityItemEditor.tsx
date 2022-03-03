import {ItemActionHandler} from "features/cities/components/CitiesView";
import {Item} from "common/types/commonTypes";

interface CityItemEditorProps {
    item: Item
    title: string
    editorOpen: boolean
    actionHandler: ItemActionHandler
}

const CityItemEditor = (props: CityItemEditorProps) => {
    return (
        <div>items!</div>
    )
}

export default CityItemEditor