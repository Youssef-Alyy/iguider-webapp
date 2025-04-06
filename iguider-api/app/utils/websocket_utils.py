import asyncio
from fastapi import WebSocket


class NotificationManager:
    def __init__(self):
        self.connected_users = {}

    async def connect_user(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.connected_users[user_id] = websocket

    async def disconnect_user(self, user_id: int):
        if user_id in self.connected_users:
            del self.connected_users[user_id]

    async def send_notification(self, user_id: int, message: str):
        if user_id in self.connected_users:
            await self.connected_users[user_id].send_text(message)

    async def broadcast(self, message: str):
        for _, websocket in self.connected_users.items():
            await websocket.send_text(message)
