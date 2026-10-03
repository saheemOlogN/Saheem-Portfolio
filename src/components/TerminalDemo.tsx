import { Terminal } from './ui/terminal';
export function TerminalDemo({ onClose }: { onClose: () => void }) {
 return <Terminal username="Saheem-Portfolio" onClose={onClose}/>;
}
