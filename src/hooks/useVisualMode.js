import {useState} from 'react';

const useVisualMode = (initial) => {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([]);

	return {
		mode: mode,
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
			const [newMode, ...newHistory] = history;
			setHistory(newHistory);
			setMode(newMode);
		}
	};
};

module.exports = useVisualMode;
