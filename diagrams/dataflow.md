- I am more interested in the topology of computer systems: some complex
  architecture with queues, Cloudflare, S3, Lambda, proxies, load
  balancers, databases, all of that. (2026-10-14 18:13)
- Let us add these pictures to the documentation. Which get used is not
  clear yet, but let them be; we will see. (19:01)

# Data flow diagram: where data crosses a trust boundary

The threat modeller's view: outside parties, processes and data stores,
the flows between them labelled with the data they carry, and the trust
boundaries as red dashed lines. Each crossing gets a number to discuss.

![The render service's data flows: a user's login and cookie through Cloudflare into the VPC, banner JSON into PostgreSQL, render jobs to SQS, rendered PNGs to S3, a card token to Stripe; eight numbered crossings, three noted: TLS ends at the load balancer, the upload skips the WAF, only a token leaves](../img/diagrams/dataflow_banners.svg)

## Fits when

- **A security review or a threat model:** each crossing is a place to
  ask what can go wrong (STRIDE per crossing).
- **Privacy:** where personal data goes and what leaves.

## Not when

- **Ports and rules:** a [network diagram](network.md).
- **The order of one request:** a [sequence diagram](sequence.md).

## How it is drawn

1. **Notation:** outside parties as boxes, processes as circles, stores as
   two open lines; a key.
2. **Flows:** arrows named by their data ("card token"), not by protocol.
3. **Boundaries:** red dashed lines; a numbered badge where a flow
   crosses one, the risky ones noted under the drawing.
