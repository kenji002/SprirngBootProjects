# API_Name: Create Poll
- Endpoints: /api/polls
- Method: POST
- Description: 投票用のオプションを含むアンケートを作成する
- Request Body: Post JSON
- Response: 201 Created - 作成された投票が返されます。

# API_Name: Get AllPolls
- Endpoints: /api/polls
- Method: GET
- Description: アンケートの一覧を取得する
- Request Body: None
- Response: 200 OK - アンケートのリストが返されます。

# API_Name: Get Poll by Id
- Endpoints: /api/polls/{id}
- Method: GET
- Description: 指定されたIDのアンケートを取得する
- Request Body: None
- Response: 200 OK - 指定されたIDのアンケートが返されます。404 Not Found - 指定されたIDのアンケートが存在しません。

# API_Name: Vote on Poll
- Endpoints: /api/polls/vote
- Method: POST
- Description: ユーザーがアンケートに投票する
- Request Body: Poll ID and Option
- Response: 204 No Content - 投票が正常に処理されました。
