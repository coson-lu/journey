from Firestore import FireStore

ref = {
    'academic': set(['homework', 'study']),
    'extracurriculars': set(['ka-math', 'oly-math', 'competitive-programming', 'coding-project', 'open-source']),
    'leisure': set(['video-games', 'youtube', 'tv'])
}

def Update(date: str, activity: str, duration: int):
    FireStore.coson_merge(date, activity, {'duration': duration})

Update('8-15-2024', 'math', 30)