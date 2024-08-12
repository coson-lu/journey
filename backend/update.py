from Firestore import FireStore

def Update(date: str, activity: str, time: int):
    FireStore.merge_document(date, {activity: time})