json.id @card.id
json.title @card.title
json.description (@card.description || '')
json.labels @card.labels.map(&:color)
json.list_id @card.list_id
json.position @card.position
json.archived @card.archived
json.created_at @card.created_at
json.updated_at @card.updated_at
json.due_date @card.due_date
json.completed @card.completed
json.board_id @card.list.board_id
json.comments @card.comments
json.actions []
