

export const LIST_MENU  = [
    {
        title: 'Listening',
        disabled: true,
        children: [
            {
                title: 'Academic Listening',
                url: '#'
            },
            {
                title: 'General Listening',
                url: '#'
            }
        ]
    },
    {
        title: 'Reading',
        disabled: true,
        children: [
            {
                title: 'Academic Reading',
                url: '/dashboard/academic-reading'
            },
            {
                title: 'General Reading',
                url: '#'
            },
        ]
    },
    {
        title: 'Writing',
        disabled: false,
        children: [
            {
                title: 'Writing Task 1',
                url: '/dashboard/writing-one'
            },
            {
                title: 'Writing Task 2',
                url: '/dashboard/writing-two'
            },
            {
                title: 'Try Writing Full Tasks',
                url: '/dashboard/writing-full'
            }
        ]
    },
    {
        title: 'Speaking',
        disabled: true,
        children: [
            {
                title: 'Mini Speaking',
                url: '/dashboard/mini-speaking'
            },
            {
                title: 'Try Full Speaking Test',
                url: '/dashboard/full-speaking'
            }
        ]
    }
]