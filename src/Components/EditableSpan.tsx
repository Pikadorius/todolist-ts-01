import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [updatedTitle, setUpdatedTitle] = useState<string>(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(updatedTitle)
    }


    const onDoubleClickHandler = () => {
        setEdit(!edit)
        addTask()
    }

    const addTaskOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEdit(!edit)
            addTask()
        }
    }


    return (
        edit ?
            <input
                autoFocus={true}
                value={updatedTitle}
                onChange={onChangeHandler}
                onKeyDown={addTaskOnEnter}/>
            :
            <span onDoubleClick={onDoubleClickHandler}>{updatedTitle}</span>
    );
};

export default EditableSpan;