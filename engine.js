class AABB {
  // Axis Aligned Bounding Box
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
}

class Circle {
  constructor(radius, position) {
    this.radius = radius;
    this.position = position;
  }
}

function AABBvsAABB(a, b) {
  // Exit with no intersection if found separated along an axis
  if (a.max.x < b.min.x || a.min.x > b.max.x) return false
  if (a.max.y < b.min.y || a.min.y > b.max.y) return false

  // No separating axis found, therefor there is at least one overlapping axis
  return true
}

function CirclevsCircle(a, b) {
  let r = a.radius + b.radius
  return r ** 2 < (a.position.x + b.position.x) ^ 2 + (a.position.y + b.position.y) ^ 2
}

function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function ResolveCollision(A, B) {
  // Calculate relative velocity
  let rv = B.velocity - A.velocity

  // Calculate relative velocity in terms of the normal direction
  let velAlongNormal = dotProduct(rv, normal)

  // Do not resolve if velocities are separating
  if (velAlongNormal > 0)
    return;

  // Calculate restitution
  let e = min(A.restitution, B.restitution)

  // Calculate impulse scalar
  let j = -(1 + e) * velAlongNormal
  j /= 1 / A.mass + 1 / B.mass

  // Apply impulse
  let impulse = createVector(j * normal.x, j * normal.y)
  A.velocity -= 1 / A.mass * impulse
  B.velocity += 1 / B.mass * impulse
}