// convert; convert between representations
// always a function

function deg_to_rad(deg)
{
    return deg * Math.PI / 180;
}

function rad_to_deg(rad)
{
    return rad * 180 / Math.PI;
}

function tuple_to_range(tuple)
{
    const [min, max] = tuple;
    return {min, max};
}

function range_to_tuple(range)
{
    return [range.min, range.max];
}
