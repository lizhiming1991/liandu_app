function randomWord(randomFlag, min, max) {
				let str = "",
					range = min,
					arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
				if (randomFlag) {
					range = Math.round(Math.random() * (max - min)) + min;
				}
				for (let i = 0; i < range; i++) {
					let pos = Math.round(Math.random() * (arr.length - 1));
					str += arr[pos];
				}
				return str;
			}
export default{
	randomWord
}