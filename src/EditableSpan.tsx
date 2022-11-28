import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);
    const [error, setError] = useState(false)

    const activateEditMode = () => {
        setEditMode(true);
        // setTitle(props.value);
    }
    const activateViewMode = () => {
        if (title.trim()) {
            setEditMode(false);
            props.onChange(title);
        } else {
            setError(true)
        }
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key==='Enter') {
            activateViewMode()
        }
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input placeholder={error ? 'Error! Write something!' : 'Enter your text...'}
                 value={title}
                 onChange={changeTitle}
                 autoFocus
                 onBlur={activateViewMode}
                 onKeyDown={onEnterHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}
