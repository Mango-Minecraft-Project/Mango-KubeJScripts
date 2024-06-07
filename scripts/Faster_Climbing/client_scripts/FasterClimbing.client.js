PlayerEvents.tick((event) => {
  const { player, player: { xRot, zza } } = event

  if (!player.onClimbable() || player.crouching) return

  const speed = 0.4
  const movement = Math.abs(xRot / 90) * speed

  if (xRot > 0 && zza == 0) {
      player.move('self', new Vec3d(0, -movement, 0))
  } else if (xRot < 0 && zza > 0) {
      player.move('self', new Vec3d(0, movement, 0))
  }
})