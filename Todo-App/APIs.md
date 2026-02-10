| HTTPメソッド | エンドポイント     | 説明                             | パラメータ                   | レスポンス  |
| ------------ | ------------------ | -------------------------------- | ---------------------------- | ----------- |
| GET          | /tasks             | すべてのタスクを習得して表示する | なし                         | tasks(View) |
| POST         | /tasks             | 指定したタイトルでタスクを作成   | title(String, Request param) | /tasks      |
| PUT          | /tasks/{id}/update | 既存タスクのタイトルを更新       | id(Path), title(String)      | /tasks      |
| DELETE       | /tasks/{id}/delete | IDでタスクを削除                 | id(Path)                     | /tasks      |
| GET          | /tasks/{id}/toggle | タスクの完了状態を切替           | id(Path)                     | /tasks      |