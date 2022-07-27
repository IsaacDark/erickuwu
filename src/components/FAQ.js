import React from 'react'

function FAQ ({faq, index, toggleFAQ}) {
	return (
		<div
			className={"faq " + (faq.open ? 'open' : '')}
			key={index}
			onClick={() => toggleFAQ(index)}
		>
			<div className="faq-question">
				{faq.enfermedad}
			</div>
			<div className="faq-answer">
				{faq.medicinas.length > 0 ? 
					faq.medicinas.map(medicina => (
						<h1>{medicina}</h1>
					))
				:
				<h1>Esta enfermedad no cuenta con medicamentos</h1>}
			</div>
		</div>
	)
}

export default FAQ