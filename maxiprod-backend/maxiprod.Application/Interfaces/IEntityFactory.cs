using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace maxiprod.Application.Interfaces
{
    public interface IEntityFactory<Entity, CreateDTO>
    {
        Entity Create(CreateDTO dto);
    }
}
