const questions = [
  {
    title: 'Types of services',
    choices: [
      {
        label: 'One Time',
        value: 'one',
        id: 'one',
        name: 'service_type',
      },
      {
        label: 'Multiple',
        value: 'multiple',
        id: 'multiple',
        name: 'service_type',
      },
    ],
  },
  {
    title: 'Number of people',
    choices: [
      {
        label: '2',
        value: '2',
        id: '2_ppl',
        name: 'pax',
      },
      {
        label: '3 - 6',
        value: '6',
        id: '6_ppl',
        name: 'pax',
      },
      {
        label: '7 - 12',
        value: '12',
        id: '12_ppl',
        name: 'pax',
      },
      {
        label: '13+',
        value: '13',
        id: 'max_ppl',
        name: 'pax',
      },
    ],
  },
  {
    title: 'Meal for',
    choices: [
      {
        label: 'Lunch',
        value: 'lunch',
        id: 'lunch_meal',
        name: 'meal_type',
      },
      {
        label: 'Dinner',
        value: 'dinner',
        id: 'dinner_meal',
        name: 'meal_type',
      },
    ],
  },
  {
    title: 'Hob',
    choices: [
      {
        label: 'Electric',
        value: 'electric',
        id: 'electric_hob',
        name: 'hob_type',
      },
      {
        label: 'Induction',
        value: 'induction',
        id: 'induction_hob',
        name: 'hob_type',
      },
      {
        label: 'Gas',
        value: 'gas',
        id: 'gas_hob',
        name: 'hob_type',
      },
    ],
  },
  {
    title: 'Quantity of Hob',
    choices: [
      {
        label: '2',
        value: '2',
        id: '2_hob',
        name: 'no_of_hob',
      },
      {
        label: '3',
        value: '3',
        id: '3_hob',
        name: 'no_of_hob',
      },
      {
        label: '4',
        value: '4',
        id: '4_hob',
        name: 'no_of_hob',
      },
      {
        label: '5',
        value: '5',
        id: '5_hob',
        name: 'no_of_hob',
      },
    ],
  },
  {
    title: 'Oven',
    choices: [
      {
        label: 'Yes',
        value: 'yes',
        id: 'yes_oven',
        name: 'oven',
      },
      {
        label: 'No',
        value: 'no',
        id: 'no_oven',
        name: 'oven',
      },
    ],
  },
  {
    title: 'Price',
    choices: [
      {
        label: '$300',
        value: '300',
        id: 'basic_price',
        name: 'price',
      },
      {
        label: '$400',
        value: '400',
        id: 'temptation_price',
        name: 'price',
      },
      {
        label: '$500',
        value: '500',
        id: 'exclusive_price',
        name: 'price',
      },
    ],
  },
  {
    title: 'Diet Restriction',
    choices: [
      {
        label: 'Yes',
        value: true,
        id: 'yes_diet',
        name: 'diet_restrictions',
      },
      {
        label: 'No',
        value: false,
        id: 'no_diet',
        name: 'diet_restrictions',
      },
    ],
  },
];

export default questions;
