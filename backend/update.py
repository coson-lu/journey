from Firestore import FireStore

def Update(user_ID: str, date: str, activity: str, duration: int):
    FireStore.coson_merge(user_ID, date, activity, {'duration': duration})
