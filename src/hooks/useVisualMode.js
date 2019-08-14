import {useState} from 'react';

const useVisualMode = (initial) => {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([]);
	//can use stacks here instead of using arrays

	return {
		mode,
		transition: (newVal, replace) => {
			if (replace) {
				setHistory([...history]);
			} else {
				setHistory([mode, ...history]);
			}
			setMode(newVal);
		},
		back: () => {
			if (history.length === 0) {
				return;
			}
			const [newMode, ...restHistory] = history;
			setHistory(restHistory);
			setMode(newMode);
		}
	};
};

// module.exports = {useVisualMode};
export default useVisualMode;
