import React, { useRef, useState } from "react";
import Alert from "./base/Alert";

interface TodoState {
  id: number;
  memo: string | undefined;
  createTime: number;
  modifyTime?: number;
}

const getTimeString = (unixTime: number) => {
  const dataTime = new Date(unixTime);
  return `${dataTime.toLocaleDateString()} ${dataTime.toLocaleTimeString()}`;
}; // 현재 시간과 날짜 표시하는 매서드

const Todo = () => {
  const [todoList, setTodoList] = useState<TodoState[]>([]);

  const [isError, setIsError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    // 입력값이 없으면 에러 메시지 표시
    if (!inputRef.current?.value) {
      setIsError(true);
      return;
    }

    const todo: TodoState = {
      id: todoList.length > 0 ? todoList[0].id + 1 : 1,
      memo: inputRef.current?.value,
      createTime: new Date().getTime(),
    };
    console.log(todo);

    setTodoList([todo, ...todoList]);

    formRef.current?.reset();

    setIsError(false);
  };

  const del = (clikedId: number) => {
    //                     전체아이디[1,2,3,4,5]  에서  클릭한아이디[3]
    setTodoList(todoList.filter((item) => item.id !== clikedId));
    //                  같지 않으면 todoList로 보냄(true), 같으면 뺌(false)
    //                 todoList = [1,2,4,5]   =>  출력 (del 선택한거 빼고 출력됨)
  };

  return (
    <>
      <h1 className="text-center my-5">To do exercise</h1>
      <form
        className="d-flex"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="to do list..."
          ref={inputRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add(null);
          }}
        >
          ADD
        </button>
      </form>

      {isError && (
        <Alert
          message={"Please leave a memo"}
          variant={"danger"}
          onClose={() => {
            setIsError(false);
          }}
        />
      )}

      <ul className="list-group list-group-flush mt-3">
        {todoList.length === 0 && (
          <li className="list-group-item">THERE IS NO DATA.</li>
        )}

        {todoList.map((item) => (
          <li className="list-group-item d-flex" key={item.id}>
            <div className="w-100">
              <span className="me-1">{item.memo}</span>
              <span>
                {"  |   "}
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <button
                className="btn btn-outline-secondary btn-sm  text-nowrap"
                onClick={() => {
                  del(item.id);
                }}
              >
                DONE
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
