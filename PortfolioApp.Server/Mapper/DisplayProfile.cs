using AutoMapper;
using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Models;

namespace PortfolioApp.Server.Mapper
{
    public class DisplayProfile : Profile
    {
        public DisplayProfile() 
        {
            CreateMap<Display, DisplayGetDto>()
                .ForMember(dest => dest.Id,
                opt => opt.MapFrom(src => src._id));

            CreateMap<DisplayCreateDto, Display>();
        }
    }
}
