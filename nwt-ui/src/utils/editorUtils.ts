import {EditorType} from "common/types/editorType";
import {messages} from "common/i18n/messages";

type EditorName = 'cityEditor' | 'itemEditor'
export const editorTitle = (editorType: EditorType, editorName: EditorName) => messages[editorName][editorType].title
