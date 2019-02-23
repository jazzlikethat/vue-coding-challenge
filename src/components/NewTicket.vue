<template>
    <div class="form-new-ticket">
        <b-form @submit="onSubmit">
            <b-form-group
                id="requestorGroup"
                label="Requestor:"
                label-for="requestor"
                description="Employee ID who submitted the ticket"
            >
                <b-form-input
                id="requestor"
                type="number"
                v-model="form.Requestor"
                required
                placeholder="Enter Requestor ID (number)" />
            </b-form-group>

            <b-form-group id="requestor-seniority-group" label="Requestor Seniority:" label-for="requestor-seniority">
                <b-form-select id="requestor-seniority" :options="requestorSeniorityArray" required v-model="form.RequestorSeniority" />
            </b-form-group>

            <b-form-group
                id="ITOwnerGroup"
                label="IT Owner:"
                label-for="ITOwner"
                description="Employee ID of IT employee who serviced ticket"
            >
                <b-form-input
                id="ITOwner"
                type="number"
                v-model="form.ITOwner"
                required
                placeholder="Enter IT Owner ID (number)" />
            </b-form-group>

            <b-form-group id="filed-against-group" label="Filed Against:" label-for="filed-against" 
                description="Functional area the ticket was filed"
            >
                <b-form-select id="filed-aganinst" :options="FiledAgainstArray" required v-model="form.FiledAgainst" />
            </b-form-group>

            <b-form-group id="ticket-type-group" label="Ticket Type:" label-for="ticket type" >
                <b-form-select id="ticket-type" :options="TicketTypeArray" required v-model="form.TicketType" />
            </b-form-group>

            <b-form-group id="severity-group" label="Severity:" label-for="severity" description="Submitter assigned severity of ticket">
                <b-form-select id="severity" :options="SeverityArray" required v-model="form.Severity" />
            </b-form-group>

            <b-form-group id="priority-group" label="Priority:" label-for="priority" description="IT assigned priority of ticket">
                <b-form-select id="priority" :options="PriorityArray" required v-model="form.Priority"></b-form-select>
            </b-form-group>

            <b-form-group
                id="days-open-group"
                label="Days Open:"
                label-for="days-open"
            >
                <b-form-input
                id="days-open"
                type="number"
                v-model="form.daysOpen"
                required
                placeholder="Enter the days the ticket is open for (number)" />
            </b-form-group>

            <b-form-group id="satisfaction-group" label="Satisfaction:" label-for="satisfaction">
                <b-form-select id="satisfaction" :options="SatisfactionArray" required v-model="form.Satisfaction"></b-form-select>
            </b-form-group>

            <div class="submit-button">
                <b-button type="submit" variant="primary">Submit</b-button>
            </div>

        </b-form>
    </div>
</template>

<script>
export default {
    name: "NewTicket",
    data: function() {
        return {
            form: {
                "Requestor": null,
                "RequestorSeniority": null,
                "ITOwner": null,
                "FiledAgainst": null,
                "TicketType": null,
                "Severity": null,
                "Priority": null,
                "daysOpen": null,
                "Satisfaction": null,
                "Ticket Creation Date": null
            },
            requestorSeniorityArray: [
                { text: "Select One", value: null             },
                { text: "Junior",     value: "1 - Junior"     },  
                { text: "Regular",    value: "2 - Regular"    },  
                { text: "Senior",     value: "3 - Senior"     },
                { text: "Management", value: "4 - Management" }
            ],
            FiledAgainstArray: [{ text: "Select One", value: null }, "Access/Login", "Hardware", "Software", "Systems"],
            TicketTypeArray: [{ text: "Select One", value: null }, "Issue", "Request"],
            SeverityArray: [
                { value: null,           text: "Select One"},
                { value: '1 - Minor',    text: 'Minor'     },
                { value: '2 - Normal',   text: 'Normal'    },
                { value: '3 - Major',    text: 'Major'     },
                { value: '4 - Critical', text: 'Critical'  }
            ],
            PriorityArray: [
                { value: null, text: "Select One"},
                { value: '0 - Unassigned', text: 'Unassigned' },
                { value: '1 - Low', text: 'Low' },
                { value: '2 - Medium', text: 'Medium' },
                { value: '3 - High', text: 'High' }
            ],
            SatisfactionArray: [
                { value: null, text: "Select One"},
                { value: "0 - Unknown", text: 'Unknown' },
                { value: "1 - Unsatisfied", text: 'Unsatisfied' },
                { value: "2 - Satisfied", text: 'Satisfied' },
                { value: "3 - Highly satisfied", text: 'Highly satisfied' }
            ]
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            this.$emit('new-ticket-data', this.form);
            this.form = {
                "Requestor": null,
                "RequestorSeniority": null,
                "ITOwner": null,
                "FiledAgainst": null,
                "TicketType": null,
                "Severity": null,
                "Priority": null,
                "daysOpen": null,
                "Satisfaction": null,
                "Ticket Creation Date": null
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.form-new-ticket {
    text-align: initial;

    .submit-button {
        text-align: center;
    }
}
</style>
