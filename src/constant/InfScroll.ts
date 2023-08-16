const InfScroll = {
  getParamString: (obj : any) => {
    let str = '';

    if (!obj) return str;

    for (let key in obj) {
      if (!obj[key] && obj[key] !== 0) continue;

      if (str !== '') str += '&';
      str += key + '=' + encodeURIComponent(obj[key]);
    }

    return str;
  },
  /** 기존 배열을 확장하고, newArr의 데이터를 startIndex부터 추가한다.
   * */
  getExpandArray: (arr : any[], newArr : any[], startIndex: number, ArrSize: number) => {
    let result = arr;

    if (arr.length !== ArrSize)
      result = Array.from({length: ArrSize}, (_, i) => {
        if (arr[i])
          return arr[i];
        return undefined;
      });

    for (let i = 0; i < newArr.length; i++)
      result[startIndex + i] = newArr[i];

    return result;
  },


}

export default InfScroll;