export function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Erreur lors du parsing:`, e);
    return fallback;
  }
}


export function getBooleanFromStorage(key: string): boolean {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) === true : false;
  } catch {
    return false;
  }
}


export function safeGetList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn(`Erreur lors du parsing de ${key}:`, e);
    return [];
  }
}


export function removeElement<T>(list : Array<T>,element : T) : Array<T> {
  let newList=[]
  for(const value of list){
    if(value===element) continue
    else{
      newList.push(value)
    }
  }
  return newList

}

