import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

async function enrolByUserId(userId: number): Promise<Enrollment> {
  return prisma.enrollment.findFirst({ where: { userId: userId } });
}

async function findEnrollmentById(enrollmentId: number): Promise<Enrollment> {
  return await prisma.enrollment.findFirst({
    where: {
      id: enrollmentId,
    },
  });
}

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  enrolByUserId,
  findWithAddressByUserId,
  upsert,
  findEnrollmentById,
};

export default enrollmentRepository;
