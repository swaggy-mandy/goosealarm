# Alarm Clock Program

This project is an alarm clock application that allows users to set alarms and play sounds when the alarms go off.

## Project Structure

```
alarm-clock
├── src
│   ├── alarm.ts        # Contains the Alarm class for managing alarms
│   ├── sound.ts        # Contains the function to play alarm sounds
│   └── types
│       └── index.ts    # Defines the AlarmType interface
├── package.json        # npm configuration file
├── tsconfig.json       # TypeScript configuration file
└── README.md           # Project documentation
```

## Installation

To get started with the alarm clock program, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd alarm-clock
npm install
```

## Usage

1. **Setting an Alarm**: Use the `setAlarm(time: string)` method from the `Alarm` class to set the desired alarm time.
2. **Activating the Alarm**: Call the `activate()` method to turn on the alarm.
3. **Deactivating the Alarm**: Use the `deactivate()` method to turn off the alarm.
4. **Playing Sound**: When the alarm goes off, the `playSound()` function from the `sound.ts` file will be triggered to play the alarm sound.

## Contributing

Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License.