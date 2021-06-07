import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

interface Todo {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
}

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

const App: React.VFC = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  /**
   * todos ステートを更新
   * @param e イベント
   */
  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 未入力の場合
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false
    };

    // ステート更新
    setTodos([newTodo, ...todos]);
    setText('');
  }

  /**
   * タスク名を編集
   * @param id タスクID
   * @param value タスク名
   */
  const handleOnEdit = (id: number, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    // ステート更新
    setTodos(newTodos);
  }

  /**
   * タスクの完了/未完了編集
   * @param id タスクID
   * @param checked 完了判定
   */
  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  }

  /**
   * タスクの削除/復元
   * @param id タスクID
   * @param removed 削除判定
   */
  const handleOnDelete = (id: number, removed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  }

  /**
   * 完了済みタスクの削除
   */
  const handleOnEmpty = () => {
    const newTodo = todos.filter((todo) => !todo.removed);
    setTodos(newTodo);
  }

  /**
   * タスクフィルター
   */
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div>
      <select defaultValue="all" onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value="all">すべて</option>
        <option value="checked">完了済み</option>
        <option value="unchecked">未完了</option>
        <option value="removed">削除済み</option>
      </select>
      {filter === 'removed' ? (
        <Button
          variant="contained"
          disabled={todos.filter((todo) => todo.removed).length === 0}
          onClick={() => handleOnEmpty()}
          startIcon={<DeleteIcon />}
          size="small"
        >
          完了済みを削除
        </Button>
      ) : (
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <TextField
              inputProps={{ 'aria-label': 'description' }}
              disabled={filter === 'checked'}
              type="text"
              label="Task"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={filter === 'checked'}
              type="submit"
              onClick={(e) => handleOnSubmit(e)}
              startIcon={<SaveIcon />}
              size="small"
            >
              追加
            </Button>
          </form>
      )}
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                disabled={todo.removed}
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
              <Input
                inputProps={{'aria-label': 'description'}}
                disabled={todo.checked || todo.removed}
                type="text"
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              {/* <input
                disabled={todo.checked || todo.removed}
                type="text"
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              /> */}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOnDelete(todo.id, todo.removed)}
                size="small"
              >
                {todo.removed ? '復元' : '削除'}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
