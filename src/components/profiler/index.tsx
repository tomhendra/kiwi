import * as React from 'react';

let queue: any = [];

setInterval(sendProfileQueue, 5000);

function sendProfileQueue() {
  if (!queue.length) {
    return Promise.resolve({ success: true });
  }
  const queueToSend = [...queue];
  queue = [];
  // in production this would send data to a backend rather than console!
  // that way data can be stored and graphed for performance monitoring
  return console.log('profile', { data: queueToSend });
}
// By wrapping the Profile like this, we can set the onRender to whatever
// we want and we get the additional benefit of being able to include
// additional data and filter phases
function Profiler({
  metadata,
  phases,
  ...props
}: {
  metadata: any;
  phases: any;
  props: any;
  id: any;
}) {
  function reportProfile(
    id: any, // the "id" prop of the Profiler tree that has just committed
    phase: 'mount' | 'update', // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration: any, // time spent rendering the committed update
    baseDuration: any, // estimated time to render the entire subtree without memoization
    startTime: any, // when React began rendering this update
    commitTime: any, // when React committed this update
    interactions: any, // the Set of interactions belonging to this update
  ) {
    if (!phases || phases.includes(phase)) {
      queue.push({
        metadata,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions: [...interactions], // convert from set to array
      });
    }
  }
  return <React.Profiler onRender={reportProfile} {...props} />;
}

export { Profiler };
export {
  unstable_trace as trace,
  unstable_wrap as wrap,
} from 'scheduler/tracing';
