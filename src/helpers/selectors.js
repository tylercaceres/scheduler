export const getAppointmentsForDay = (state, day) => {
	const stateDays = state.days.find((stateDay) => stateDay.name === day);
	if (stateDays) {
		if (stateDays.appointments) {
			return stateDays.appointments.map((appt) => {
				return state.appointments[appt];
			});
		}
	} else {
		return [];
	}
};

export const getInterview = (state, interview) => {
	return !interview
		? null
		: {
				student: interview.student,
				interviewer: {...state.interviewers[interview.interviewer]}
		  };
};

export const getInterviewersForDay = (state, day) => {
	const stateDays = state.days.find((stateDay) => stateDay.name === day);
	if (stateDays) {
		if (stateDays.appointments) {
			const appointments = stateDays.appointments.map((appt) => {
				return state.appointments[appt];
			});
			return appointments
				.filter((appt) => appt.interview !== null)
				.map((appt) => appt.interview.interviewer)
				.map((interviewer) => state.interviewers[interviewer]);
		}
	} else {
		return [];
	}
};
